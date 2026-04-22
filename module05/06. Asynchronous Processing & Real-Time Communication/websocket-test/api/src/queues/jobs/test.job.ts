// this job will be processed by a worker that listens to the "test-queue" and executes the "sendEmail" job

const testJob = async (data: { email: string }) => {
	console.log(`Processing job for ${data.email}`);

	await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulate email sending delay

	console.log(`Email sent to ${data.email}`);
};

export default testJob;
