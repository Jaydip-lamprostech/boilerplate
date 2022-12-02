import "@rainbow-me/rainbowkit/styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FirstPage from "./pages/FirstPage";
import SecondPage from "./pages/SecondPage";
import ThirdPage from "./pages/ThirdPage";

function App() {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "projectone",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/page1" element={<FirstPage />} />
              <Route path="/page2" element={<SecondPage />} />
              <Route path="/page3" element={<ThirdPage />} />
            </Routes>
          </Router>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
