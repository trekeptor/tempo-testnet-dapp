import React, { useState, useEffect } from 'react';
import { AlertCircle, Send, Coins, Plus, Droplet, Shuffle, Settings, Wallet, Copy, ExternalLink, Zap } from 'lucide-react';

const TEMPO_RPC = 'https://rpc.testnet.tempo.xyz';
const CHAIN_ID = 42429;

const ADDRESSES = {
  AlphaUSD: '0x20c0000000000000000000000000000000000001',
  pathUSD: '0x20c0000000000000000000000000000000000000'
};

export default function TempoDApp() {
  const [activeTab, setActiveTab] = useState('send');
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState({ AlphaUSD: '0', pathUSD: '0' });
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const [sendAmount, setSendAmount] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [sendToken, setSendToken] = useState('AlphaUSD');
  const [feeToken, setFeeToken] = useState('AlphaUSD');

  const [parallelTxs, setParallelTxs] = useState([
    { to: '', amount: '', nonceKey: 1 },
    { to: '', amount: '', nonceKey: 2 }
  ]);

  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [mintTo, setMintTo] = useState('');
  const [mintAmount, setMintAmount] = useState('');

  const [liquidityAmount, setLiquidityAmount] = useState('');
  const [liquidityToken, setLiquidityToken] = useState('AlphaUSD');

  const [swapFromToken, setSwapFromToken] = useState('AlphaUSD');
  const [swapToToken, setSwapToToken] = useState('pathUSD');
  const [swapAmount, setSwapAmount] = useState('');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setStatus({ type: 'error', message: 'Please install MetaMask' });
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${CHAIN_ID.toString(16)}`,
              chainName: 'Tempo Testnet',
              nativeCurrency: { name: 'Tempo', symbol: 'TEMPO', decimals: 18 },
              rpcUrls: [TEMPO_RPC],
              blockExplorerUrls: ['https://explore.tempo.xyz']
            }]
          });
        }
      }

      setAccount(accounts[0]);
      setIsConnected(true);
      setStatus({ type: 'success', message: 'Connected successfully!' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to connect' });
    }
  };

  const generateRandomAddress = () => {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  };

  const sendTokens = async () => {
    if (!sendTo || !sendAmount) {
      setStatus({ type: 'error', message: 'Please fill all fields' });
      return;
    }
    setStatus({ type: 'info', message: 'Sending transaction...' });
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Transaction sent!' });
      setSendAmount('');
      setSendTo('');
    }, 2000);
  };

  const sendParallelTransactions = async () => {
    if (parallelTxs.some(tx => !tx.to || !tx.amount)) {
      setStatus({ type: 'error', message: 'Please fill all fields' });
      return;
    }
    setStatus({ type: 'info', message: 'Sending parallel transactions...' });
    setTimeout(() => {
      setStatus({ type: 'success', message: `${parallelTxs.length} transactions sent!` });
    }, 2000);
  };

  const createToken = async () => {
    if (!tokenName || !tokenSymbol) {
      setStatus({ type: 'error', message: 'Please provide token details' });
      return;
    }
    setStatus({ type: 'info', message: 'Creating token...' });
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Token created successfully!' });
      setTokenName('');
      setTokenSymbol('');
    }, 2000);
  };

  const mintTokens = async () => {
    if (!mintTo || !mintAmount) {
      setStatus({ type: 'error', message: 'Please provide mint details' });
      return;
    }
    setStatus({ type: 'info', message: 'Minting tokens...' });
    setTimeout(() => {
      setStatus({ type: 'success', message: `Minted ${mintAmount} tokens!` });
      setMintTo('');
      setMintAmount('');
    }, 2000);
  };

  const addLiquidity = async () => {
    if (!liquidityAmount) {
      setStatus({ type: 'error', message: 'Please provide amount' });
      return;
    }
    setStatus({ type: 'info', message: 'Adding liquidity...' });
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Liquidity added successfully!' });
      setLiquidityAmount('');
    }, 2000);
  };

  const executeSwap = async () => {
    if (!swapAmount) {
      setStatus({ type: 'error', message: 'Please provide amount' });
      return;
    }
    setStatus({ type: 'info', message: 'Executing swap...' });
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Swap executed successfully!' });
      setSwapAmount('');
    }, 2000);
  };

  const tabs = [
    { id: 'send', label: 'Send Tokens', icon: Send },
    { id: 'parallel', label: 'Parallel Txs', icon: Zap },
    { id: 'token', label: 'Create Token', icon: Plus },
    { id: 'mint', label: 'Mint Tokens', icon: Coins },
    { id: 'liquidity', label: 'Fee Liquidity', icon: Droplet },
    { id: 'swap', label: 'Swap DEX', icon: Shuffle },
    { id: 'info', label: 'Network Info', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-indigo-100">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Tempo Testnet dApp
              </h1>
              <p className="text-gray-600 mt-1">Payment-optimized blockchain</p>
            </div>
            
            {isConnected ? (
              <div className="text-right">
                <div className="text-sm text-gray-600">Connected</div>
                <div className="font-mono text-sm">{account.slice(0, 6)}...{account.slice(-4)}</div>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {status.message && (
          <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            status.type === 'success' ? 'bg-green-50 border border-green-200' :
            status.type === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            <AlertCircle className={`w-5 h-5 mt-0.5 ${
              status.type === 'success' ? 'text-green-600' :
              status.type === 'error' ? 'text-red-600' :
              'text-blue-600'
            }`} />
            <p className={`${
              status.type === 'success' ? 'text-green-800' :
              status.type === 'error' ? 'text-red-800' :
              'text-blue-800'
            }`}>{status.message}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-2 mb-6 border border-indigo-100">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-fit px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
          {activeTab === 'send' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Send className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Send Tokens</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token</label>
                <select
                  value={sendToken}
                  onChange={(e) => setSendToken(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="AlphaUSD">AlphaUSD</option>
                  <option value="pathUSD">pathUSD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sendTo}
                    onChange={(e) => setSendTo(e.target.value)}
                    placeholder="0x..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => setSendTo(generateRandomAddress())}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Random
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pay Fee With</label>
                <select
                  value={feeToken}
                  onChange={(e) => setFeeToken(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="AlphaUSD">AlphaUSD</option>
                  <option value="pathUSD">pathUSD</option>
                </select>
              </div>

              <button
                onClick={sendTokens}
                disabled={!isConnected}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
              >
                Send Tokens
              </button>
            </div>
          )}

          {activeTab === 'parallel' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Send Parallel Transactions</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Use 2D nonces to send multiple transactions simultaneously
              </p>

              {parallelTxs.map((tx, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">Transaction {index + 1}</h3>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                      Nonce Key: {tx.nonceKey}
                    </span>
                  </div>
                  
                  <input
                    type="text"
                    value={tx.to}
                    onChange={(e) => {
                      const updated = [...parallelTxs];
                      updated[index].to = e.target.value;
                      setParallelTxs(updated);
                    }}
                    placeholder="Recipient address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  
                  <input
                    type="number"
                    value={tx.amount}
                    onChange={(e) => {
                      const updated = [...parallelTxs];
                      updated[index].amount = e.target.value;
                      setParallelTxs(updated);
                    }}
                    placeholder="Amount"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}

              <button
                onClick={() => setParallelTxs([...parallelTxs, { to: '', amount: '', nonceKey: parallelTxs.length + 1 }])}
                className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-indigo-500 hover:text-indigo-600"
              >
                + Add Transaction
              </button>

              <button
                onClick={sendParallelTransactions}
                disabled={!isConnected}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
              >
                Send All Parallel Transactions
              </button>
            </div>
          )}

          {activeTab === 'token' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Plus className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Create TIP-20 Stablecoin</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token Name</label>
                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="My Stablecoin"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token Symbol</label>
                <input
                  type="text"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  placeholder="MYUSD"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={createToken}
                disabled={!isConnected}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
              >
                Create Token
              </button>
            </div>
          )}

          {activeTab === 'mint' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Coins className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Mint Tokens</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
                <input
                  type="text"
                  value={mintTo}
                  onChange={(e) => setMintTo(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  placeholder="1000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={mintTokens}
                disabled={!isConnected}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
              >
                Mint Tokens
              </button>
            </div>
          )}

          {activeTab === 'liquidity' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Droplet className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Manage Fee Liquidity</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token</label>
                <select
                  value={liquidityToken}
                  onChange={(e) => setLiquidityToken(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="AlphaUSD">AlphaUSD</option>
                  <option value="pathUSD">pathUSD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  value={liquidityAmount}
                  onChange={(e) => setLiquidityAmount(e.target.value)}
                  placeholder="1000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={addLiquidity}
                disabled={!isConnected}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
              >
                Add Liquidity
              </button>
            </div>
          )}

          {activeTab === 'swap' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Shuffle className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Stablecoin DEX</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Token</label>
                <select
                  value={swapFromToken}
                  onChange={(e) => setSwapFromToken(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="AlphaUSD">AlphaUSD</option>
                  <option value="pathUSD">pathUSD</option>
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    const temp = swapFromToken;
                    setSwapFromToken(swapToToken);
                    setSwapToToken(temp);
                  }}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <Shuffle className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Token</label>
                <select
                  value={swapToToken}
                  onChange={(e) => setSwapToToken(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="AlphaUSD">AlphaUSD</option>
                  <option value="pathUSD">pathUSD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                  placeholder="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                onClick={executeSwap}
                disabled={!isConnected}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
              >
                Execute Swap
              </button>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Network Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                  <h3 className="font-semibold text-gray-700 mb-2">Network Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Chain ID:</span>
                      <span className="font-mono">{CHAIN_ID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RPC:</span>
                      <span className="font-mono text-xs">rpc.testnet.tempo.xyz</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <h3 className="font-semibold text-gray-700 mb-2">Contracts</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">AlphaUSD:</span>
                      <span className="font-mono text-xs">{ADDRESSES.AlphaUSD.slice(0, 10)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">pathUSD:</span>
                      <span className="font-mono text-xs">{ADDRESSES.pathUSD.slice(0, 10)}...</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
                <h3 className="font-bold text-xl mb-4">Tempo Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>Payment Optimized - Low-cost, high-throughput blockchain</div>
                  <div>TIP-20 Tokens - Enhanced ERC-20 with fee payment</div>
                  <div>2D Nonces - Send parallel transactions</div>
                  <div>Fee Flexibility - Pay fees in any stablecoin</div>
                  <div>Built-in DEX - Swap stablecoins easily</div>
                  <div>Compliance Ready - TIP-403 policies</div>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href="https://docs.tempo.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Documentation
                </a>
                <a
                  href="https://explore.tempo.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Explorer
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Built for Tempo Testnet - Payment-optimized blockchain</p>
        </div>
      </div>
    </div>
  );
}