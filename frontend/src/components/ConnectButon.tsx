import {
  ThirdwebProvider,
  ConnectButton,
  darkTheme,
} from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
];

//@ts-expect-error
const ConnectButtonComponent = ({ clientId }) => {

  const client = createThirdwebClient({
    clientId: clientId,
  });


  
  return (
    <ThirdwebProvider>
      <ConnectButton
        client={client}
        wallets={wallets}
        accountAbstraction={{
          chain: baseSepolia,
          factoryAddress: "0x70c11ddFBC035abD25cB629512126a873880b1a9",
          gasless: true,
        }}
        theme={darkTheme({
          colors: {
            accentButtonText: "#fdfcfd",
            primaryButtonBg: "#1a1523",
            primaryButtonText: "#fdfcfd",
            secondaryButtonBg: "#22232b",
            secondaryButtonHoverBg: "#262830",
            secondaryButtonText: "#ededef",
            connectedButtonBg: "#1a1523",
          }
        })}
        connectButton={{ label: "Sign In" }}
        connectModal={{
          size: "wide",
          titleIcon: "/world-white.png",
        }}
      />
    </ThirdwebProvider>
  );
};

export default ConnectButtonComponent;