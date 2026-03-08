function Child({ calculateSum }) {
	return (
		<div>
			<button onClick={() => calculateSum(10, 20)}>Add</button>
		</div>
	);
}

function App() {
	const handleAddition = (num1, num2) => {
		const sum = num1 + num2;
		alert(
			`First Number: ${num1}\nSecond Number: ${num2}\nAddition: ${sum}`
		);
	};

	return (
		<div>
			<h2>Addition Using Function Prop</h2>
			<Child calculateSum={handleAddition} />
		</div>
	);
}

export default App;
