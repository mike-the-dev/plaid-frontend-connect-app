import React from "react";
import './App.css';
import Link from "./components/Link";

const App: React.FC = (): React.ReactElement => {
  const [linkToken, setLinkToken] = React.useState(null);

  const generateToken = async () => {
    const response = await fetch('http://localhost:3001/plaid/create-link-token', {
      method: 'POST',
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };
  
  React.useEffect(() => {
    generateToken();
  }, []);
  
  console.log("Link token state: ", linkToken);

  return (
    <div className="App">
      <header className="App-header">
        <div className="heading">Create Your Account With Plaid</div>
        {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
      </header>
    </div>
  );
};

export default App;
