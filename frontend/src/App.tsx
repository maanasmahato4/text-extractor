import { FormEvent, useState } from 'react';
import axios from 'axios';
import {
	Container,
	Flex,
	Group,
	Text,
	rem,
	Image,
	Button,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

function App() {
	const [uploadedFile, setUploadedFile] = useState<File>();
	const [texts, setTexts] = useState<string[]>([]);

	async function handleSubmit(e: FormEvent): Promise<void> {
		e.preventDefault();
		if (!uploadedFile) {
			alert('No file Uploaded');
		} else {
			const fileFormData = new FormData();
			fileFormData.append('image', uploadedFile);
			const response = await axios.post(
				'http://localhost:3000/api',
				fileFormData,
				{
					headers: {
						'Content-type': 'multipart/form-data',
					},
				},
			);
			const responseText = response.data;
			let splittedTexts = responseText.text.split('\n');
			console.log(responseText.text);
			setTexts(splittedTexts);
		}
	}
	return (
		<Container style={{ marginBlock: '1rem' }}>
			<Dropzone
				onDrop={(files: File[]) => {
					console.log('accepted files', files);
					setUploadedFile(files[0]);
				}}
				onReject={(files) => console.log('rejected files', files)}
				maxSize={5 * 1024 ** 2}
				accept={IMAGE_MIME_TYPE}
			>
				<Group
					justify='center'
					gap='xl'
					mih={220}
					style={{ pointerEvents: 'none' }}
				>
					<Dropzone.Accept>
						<IconUpload
							style={{
								width: rem(52),
								height: rem(52),
								color: 'var(--mantine-color-blue-6)',
							}}
							stroke={1.5}
						/>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<IconX
							style={{
								width: rem(52),
								height: rem(52),
								color: 'var(--mantine-color-red-6)',
							}}
							stroke={1.5}
						/>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<IconPhoto
							style={{
								width: rem(52),
								height: rem(52),
								color: 'var(--mantine-color-dimmed)',
							}}
							stroke={1.5}
						/>
					</Dropzone.Idle>

					<div>
						<Text size='xl' inline>
							Drag images here or click to select files
						</Text>
						<Text size='sm' c='dimmed' inline mt={7}>
							Attach as many files as you like, each file should not exceed 5mb
						</Text>
					</div>
				</Group>
			</Dropzone>
			<Flex
				justify='space-between'
				direction='row'
				 style={{ marginTop: '1rem', marginBottom: '1rem' }}
			>
				<div style={{ flex: '40%' }}>
					{uploadedFile ? (
						<Image
							radius='md'
							src={URL.createObjectURL(uploadedFile)}
							alt='Uploaded'
							style={{ height: '50vh', objectFit: 'cover' }}
						/>
					) : (
						<p
							style={{ marginBlock: '20vh', objectFit: 'cover', textAlign: 'center' }}
						>
							No image uploaded yet
						</p>
					)}
				</div>
				<Button
					onClick={handleSubmit}
					style={{ flexBasis: '10%', marginInline: '1rem', marginBlock: '20vh' }}
				>
					Extract
				</Button>
				<div style={{ flex: '40%' }}>
					{texts.length >= 1 ? (
						<div style={{ height: '50vh', objectFit: 'cover' }}>
							{texts.map((text: string, idx: number) => (
								<p key={idx}>{text}</p>
							))}
							<Button onClick={() => navigator.clipboard.writeText(texts.join('\n'))}>
								Copy
							</Button>
						</div>
					) : (
						<p
							style={{ marginBlock: '20vh', objectFit: 'cover', textAlign: 'center' }}
						>
							No image uploaded yet
						</p>
					)}
				</div>
			</Flex>
		</Container>
	);
}

export default App;
