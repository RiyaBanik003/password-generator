import { useState, useCallback, useEffect } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      string += "0123456789";
    }

    if (charAllowed) {
      string += "!@#$%^&*(){}[]+-_|~`";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);
  
  const copyPassword= useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    
  }, [password])
  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div style={{
        maxWidth: '50%',
        margin: 'auto',
        marginTop: '40vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.5rem',
        padding: '1rem',
        backgroundColor: '#F4ACB7',
        color: '#9D8189'

      }}>
        <div className='flex shadow rounded-lg overflow-hidden mb-2 mt-2'>
          <input type="text" value={password} className='outline-none w-full py-2 px-3' placeholder=' Enter your Password' readOnly />
          <button className='bg-[#a4133c] text-white px-2' onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 '>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={numberAllowed} id="numberInput" onChange={() => {
              setNumberAllowed((prev) => !prev);

            }} />
            <lable htmlFor="numberInput">Numbers</lable>
          </div>
    
         <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={charAllowed} id="characterInput" onChange={() => {
              setCharAllowed((prev) => !prev);

            }} />
            <label htmlFor='CharacterInput'>Characters</label> 
          </div>
          </div>
          </div>
    </>
  );
}

export default App;
