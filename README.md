# Tempo Testnet dApp

A comprehensive decentralized application (dApp) for interacting with the Tempo Testnet blockchain - a payment-optimized blockchain platform.

![Tempo dApp](https://img.shields.io/badge/Tempo-Testnet-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.3-38bdf8)

## 🌟 Features

### 💸 Send Tokens
- Send AlphaUSD or pathUSD to any address
- Auto-generate random test addresses
- Choose which stablecoin to pay transaction fees with
- Add optional payment memos

### ⚡ Parallel Transactions
- Send multiple transactions simultaneously using Tempo's 2D nonces
- No need to wait for previous transaction confirmations
- Add unlimited parallel transactions
- Each transaction uses a different nonce key for true parallelization

### 🪙 Create TIP-20 Tokens
- Create new TIP-20 stablecoins with built-in features:
  - Can be used to pay transaction fees
  - Dedicated payment lanes for low fees
  - Built-in compliance with TIP-403 policies
  - DEX quote token support
  - Role-based access control

### 💰 Mint Tokens
- Mint new tokens to any address
- Requires ISSUER_ROLE permissions
- Easy-to-use interface for token distribution

### 💧 Fee Liquidity Management
- Add liquidity to the Fee AMM (Automated Market Maker)
- Enable users to pay fees in any stablecoin
- Earn fees from fee conversions
- Support cross-token payments

### 🔄 Stablecoin DEX
- Swap between stablecoins using the built-in DEX
- Low slippage for stablecoin pairs
- Approximate 1:1 exchange rates
- Real-time swap preview

### ⚙️ Network Information
- View all predeployed contract addresses
- Network configuration details
- Direct links to documentation and block explorer
- Overview of Tempo blockchain features

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- MetaMask or another Web3-compatible wallet
- Basic understanding of blockchain and Web3

### Installation

1. **Clone or download the project:**
```bash
   mkdir tempo-testnet-dapp
   cd tempo-testnet-dapp
```

2. **Create all project files** as outlined in the project structure

3. **Install dependencies:**
```bash
   npm install
```

4. **Start the development server:**
```bash
   npm run dev
```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

### Building for Production
```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔧 Configuration

### Tempo Testnet Network Details

- **Network Name:** Tempo Testnet
- **Chain ID:** 42429 (0xa5dd in hex)
- **RPC URL:** https://rpc.testnet.tempo.xyz
- **Block Explorer:** https://explore.tempo.xyz
- **Native Currency:** TEMPO

### Predeployed Contract Addresses
```javascript
AlphaUSD: 0x20c0000000000000000000000000000000000001
pathUSD:  0x20c0000000000000000000000000000000000000
```

## 📖 Usage Guide

### Connecting Your Wallet

1. Click the "Connect Wallet" button in the top right
2. Approve the connection in your wallet
3. The dApp will automatically add/switch to Tempo Testnet
4. Your address will be displayed once connected

### Getting Testnet Tokens

Visit the [Tempo Faucet](https://docs.tempo.xyz/quickstart/faucet) to receive testnet tokens:
- AlphaUSD for testing transactions
- pathUSD for testing swaps
- TEMPO for gas fees

### Sending Your First Transaction

1. Navigate to the "Send Tokens" tab
2. Select the token you want to send (AlphaUSD or pathUSD)
3. Enter the recipient address (or click "Random" for testing)
4. Enter the amount
5. Choose which token to pay fees with
6. Click "Send Tokens"

### Using Parallel Transactions

1. Go to the "Parallel Txs" tab
2. Fill in recipient addresses and amounts for each transaction
3. Click "+ Add Transaction" to add more parallel transactions
4. Click "Send All Parallel Transactions"
5. All transactions will be sent simultaneously without waiting

### Creating a Stablecoin

1. Navigate to "Create Token" tab
2. Enter your token name (e.g., "My Stablecoin")
3. Enter token symbol (e.g., "MYUSD")
4. Optionally set initial supply
5. Click "Create Token"
6. Note: Actual token creation requires integration with TIP-20 Factory

## 🏗️ Project Structure
```
tempo-testnet-dapp/
├── package.json           # Project dependencies and scripts
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # Main dApp component
    └── index.css         # Global styles
```

## 🛠️ Technology Stack

- **Frontend Framework:** React 18.2.0
- **Build Tool:** Vite 4.4.5
- **Styling:** Tailwind CSS 3.3.3
- **Icons:** Lucide React 0.263.1
- **Blockchain Interaction:** Web3 (via MetaMask)

## 🌐 Tempo Blockchain Features

### TIP-20 Tokens
Enhanced ERC-20 tokens with:
- Native fee payment capability
- Compliance-ready design
- Role-based access control
- DEX integration support

### 2D Nonces
- Send multiple transactions in parallel
- Independent nonce keys for different transaction streams
- No sequential dependency between transactions

### Fee Flexibility
- Pay transaction fees in any TIP-20 stablecoin
- Fee AMM automatically converts fees
- Improves user experience by removing native token requirement

### Built-in DEX
- Protocol-level stablecoin exchange
- Optimized for low slippage on stable pairs
- No external DEX dependency

### TIP-403 Compliance
- Built-in policy enforcement
- Support for regulatory requirements
- Programmable compliance rules

## 📚 Resources

- [Tempo Documentation](https://docs.tempo.xyz)
- [Tempo Testnet Explorer](https://explore.tempo.xyz)
- [Tempo GitHub](https://github.com/tempoxyz)
- [Get Testnet Tokens](https://docs.tempo.xyz/quickstart/faucet)

## 🔐 Security Notes

- This is a **TESTNET** application - do not use with real funds
- Always verify transaction details before signing
- Never share your private keys or seed phrases
- This dApp uses simulation for some features - refer to Tempo docs for production implementation

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🐛 Known Issues

- Some features (token creation, minting, liquidity) are simulated for demo purposes
- Actual blockchain interaction requires proper contract deployment and ABI integration
- Balance fetching may not work if RPC is unavailable

## 🗺️ Roadmap

- [ ] Full Web3 integration with actual contract calls
- [ ] Transaction history viewer
- [ ] Real-time balance updates
- [ ] Multi-wallet support (WalletConnect, Coinbase Wallet)
- [ ] Advanced swap features with slippage control
- [ ] Token allowance management
- [ ] Gas estimation display
- [ ] Mobile responsive improvements

## 💬 Support

For questions, issues, or feedback:

- Open an issue on GitHub
- Visit [Tempo Discord](https://discord.gg/tempo)
- Email: partners@tempo.xyz

## ⚠️ Disclaimer

This dApp is provided "as is" for educational and testing purposes. Use at your own risk. The developers are not responsible for any loss of funds or issues arising from the use of this application.

---

**Built with ❤️ for the Tempo blockchain ecosystem**
