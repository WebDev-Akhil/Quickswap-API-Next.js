/** @format */

import dynamic from 'next/dynamic'

const Quickswap = dynamic(() => import('../src/components/Quickswap'), { ssr: false })

export default function Page() {
	return <Quickswap />
}
