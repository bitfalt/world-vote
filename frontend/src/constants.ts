import { createThirdwebClient } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import type { SmartWalletOptions } from "thirdweb/wallets";
import type { ConnectManagerOptions } from "thirdweb/react";

const clientId = import.meta.env.THIRDWEB_CLIENT_ID;

if (!clientId) {
    throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
    clientId: clientId,
});

export const chain = baseSepolia;

export const accountAbstraction: SmartWalletOptions = {
    chain,
    factoryAddress: "0x70c11ddFBC035abD25cB629512126a873880b1a9",
    sponsorGas: true,
};

export const connectOptions = {
    accountAbstraction: accountAbstraction,
    client: client,
};