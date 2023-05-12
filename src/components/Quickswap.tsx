/** @format */

import React, { useState, useEffect } from 'react'
import { ApolloQueryResult } from '@apollo/client'
import { quickswapGetSubgraphInfo, QuickswapSubgraphInfo } from '../app/web3/getSubgraphInfo'

function QuickswapComponent() {
	const [poolAddress, setPoolAddress] = useState('0x019ba0325f1988213d448b3472fa1cf8d07618d7')
	const [poolData, setPoolData] = useState<QuickswapSubgraphInfo | null>(null)

	useEffect(() => {
		const fetchPoolData = async () => {
			try {
				const result: ApolloQueryResult<{ pair: any; pairDayDatas: any[] }> =
					await quickswapGetSubgraphInfo(poolAddress)
				setPoolData(result.data)
			} catch (error) {
				console.error('Failed to fetch pool data', error)
			}
		}

		fetchPoolData()
	}, [poolAddress])

	const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPoolAddress(event.target.value)
	}

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
	}

	return (
		<main className='flex flex-col items-center justify-center p-6 sm:p-12 bg-gray-100 min-h-screen'>
			<h1 className='mb-8 text-3xl font-bold text-center text-gray-900'>Quickswap API Demo</h1>

			<form className='mb-4 w-full max-w-md' onSubmit={handleSubmit}>
				<input
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					type='text'
					value={poolAddress}
					onChange={handleAddressChange}
					placeholder='Enter pool address'
				/>
				<button
					className='w-full mt-3 py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
					type='submit'
				>
					Fetch Data
				</button>
			</form>

			{poolData && poolData.pair && (
				<div className='w-full max-w-md px-8 py-6 bg-white rounded shadow-md'>
					<h2 className='text-2xl font-semibold text-gray-700'>Pair Information</h2>
					<p className='mt-2 text-gray-600'>Reserve USD: {poolData.pair.reserveUSD}</p>
					<p className='mt-2 text-gray-600'>
						Last daily volume USD: {poolData.pairDayDatas[0].dailyVolumeUSD} (date:{' '}
						{new Date(poolData.pairDayDatas[0].date * 1000).toLocaleDateString()})
					</p>
					<h2 className='mt-6 text-2xl font-semibold text-gray-700'>Token 0</h2>
					<p className='mt-2 text-gray-600'>ID: {poolData.pair.token0.id}</p>
					<p className='mt-2 text-gray-600'>Symbol: {poolData.pair.token0.symbol}</p>
					<p className='mt-2 text-gray-600'>Name: {poolData.pair.token0.name}</p>
					<p className='mt-2 text-gray-600'>Decimals: {poolData.pair.token0.decimals}</p>
					<p className='mt-2 text-gray-600'>Total Supply: {poolData.pair.token0.totalSupply}</p>
					<h2 className='mt-6 text-2xl font-semibold text-gray-700'>Token 1</h2>
					<p className='mt-2 text-gray-600'>ID: {poolData.pair.token1.id}</p>
					<p className='mt-2 text-gray-600'>Symbol: {poolData.pair.token1.symbol}</p>
					<p className='mt-2 text-gray-600'>Name: {poolData.pair.token1.name}</p>
					<p className='mt-2 text-gray-600'>Decimals: {poolData.pair.token1.decimals}</p>
					<p className='mt-2 text-gray-600'>Total Supply: {poolData.pair.token1.totalSupply}</p>
				</div>
			)}
		</main>
	)
}

export default function Quickswap() {
	return <QuickswapComponent />
}
