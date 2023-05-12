/** @format */

export default async function handler(req: any, res: any) {
	const { body } = req
	const response = await fetch('https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(body),
		cache: 'no-cache',
	})

	if (response.ok) {
		const data = await response.json()
		res.status(200).json(data)
	} else {
		console.error(await response.text())
		res
			.status(response.status)
			.json({ error: 'Failed to fetch quickswap data from  thegraph.com' })
	}
}
