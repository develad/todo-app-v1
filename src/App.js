import Home from './components/Home';

function App() {
  return (
    <div className='app-cont-new'>
      <h1
        style={{
          marginTop: '50px',
          fontSize: '3.5rem',
          textAlign: 'center',
          padding: '10px 20px',
          border: '5px solid white',
          borderRadius: '15px',
          backgroundColor: 'black',
          fontFamily: "'Righteous', cursive",
        }}
      >
        ToDo App
      </h1>
      <Home />
    </div>
  );
}

export default App;
