

var ContractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawFunds",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	}
];

var ContractAddress = '0xf8fd483D2F6B0e075f72A9C3B54163F3BD571612'



document.addEventListener('DOMContentLoaded', () => {


    var loginbutton = document.getElementById('connect_to_metamask');
    var useraddress = document.getElementById('accountaddress');
    var depositeinput = document.getElementById('depositeeth');
    var depositebutton = document.getElementById('depositebutton');
    var withdrawinput = document.getElementById('withdraweth');
    var withdrawbutton = document.getElementById('withdrawbutton');
    var getbalancebutton = document.getElementById('getbalance');
    var balance = document.getElementById('balance');

    var address, web3, myContract;

    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');

        var metamaskbutton = document.getElementById('connect_to_metamask');

        web3 = new Web3(window.ethereum);
        console.log("web3 is loaded", web3);

        myContract = new web3.eth.Contract(ContractABI, ContractAddress);

        console.log("contract is loaded", myContract);


        loginbutton.addEventListener('click', async () => {
            ethereum.request({ method: 'eth_requestAccounts' });

            var accounts = await ethereum.request({ method: 'eth_requestAccounts' }); // returns an array of conneccted accounts
            address = accounts[0];
            useraddress.innerText = address;

            useraddress.classList.remove('d-none');
            loginbutton.classList.add('d-none');
            console.log(accounts);
            console.log(accounts[0]);
        });


        depositebutton.addEventListener('click', () => {

            console.log(depositeinput.value);

            myContract.methods.deposit().send({from : address, value:depositeinput.value}, function (err, res) {
                console.log(res);
            })

        });

        withdrawbutton.addEventListener('click', () => {

            myContract.methods.withdraw(withdrawinput.value).send({from : address}, function (err, res) {
                console.log(res);
            })

        });

        getbalancebutton.addEventListener('click', () => {

            myContract.methods.getBalance().call({from : address}, function (err, res) {
                console.log(res);
                balance.innerText = res;
            })

        });

        ethereum.on('accountsChanged', async function (accounts) {
            // Time to reload your interface with accounts[0]!
            var accounts = await ethereum.request({ method: 'eth_requestAccounts' }); // returns an array of conneccted accounts
            address = accounts[0];
            useraddress.innerText = address;
        });


    } else {
        alert("please install metamask !");
    }
})


