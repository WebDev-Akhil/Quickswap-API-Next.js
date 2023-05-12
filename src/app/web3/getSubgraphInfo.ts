/** @format */

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
	uri: '/api/quickswap',
	cache: new InMemoryCache(),
	headers: {
		'Content-Type': 'application/json',
	},
})

export interface QuickswapSubgraphInfo {
	pair: {
		reserveUSD: number
		token0: {
			id: string
			symbol: string
			name: string
			decimals: number
			totalSupply: string
		}
		token1: {
			id: string
			symbol: string
			name: string
			decimals: number
			totalSupply: string
		}
	}
	pairDayDatas: Array<{
		date: number
		dailyVolumeUSD: number
	}>
}

export async function quickswapGetSubgraphInfo(poolAddress: string) {
	return client.query({
		query: gql`
    {
      pair(id: "${poolAddress}") {
        reserveUSD
        token0 {
          id
          symbol
          name
          decimals
          totalSupply
        }
        token1 {
          id
          symbol
          name
          decimals
          totalSupply
        }
      }
      pairDayDatas(first: 1, orderBy: date, orderDirection: desc, where: {pairAddress: "${poolAddress}"}) {
        date
        dailyVolumeUSD
      }
    }
    `,
	})
}
