export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'

export function initializeWeb3(web3){
  return {
    type: WEB3_INITIALIZED,
    web3
  }
}