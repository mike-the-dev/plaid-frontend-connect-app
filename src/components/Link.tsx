import React from "react";
import { PlaidLinkError, PlaidLinkOnExitMetadata, PlaidLinkOnSuccessMetadata, usePlaidLink } from "react-plaid-link";
import "../App.css";

interface LinkProps {
  linkToken: string | null;
};

const Link: React.FC<LinkProps> = (props): React.ReactElement => {
  const onSuccess = React.useCallback(async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
    console.log("Public token obtained: ", public_token);
    console.log("Exchanging public token for access token...");
    // send public_token to server
    const response = await fetch("http://localhost:3001/plaid/exchange_public_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token }),
    });
    // // Handle response ...
    const data = await response.json();
    console.log("Access token exchange complete: ", data.public_token_exchange);
  }, []);

  const onExit = React.useCallback((error: null | PlaidLinkError, metadata: PlaidLinkOnExitMetadata) => {
    console.error("Error occured");
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken!,
    onSuccess: onSuccess,
    onExit: onExit
  };
  const { open, ready } = usePlaidLink(config);

  return (
    <button className="button" onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};

export default Link;