function Button({ text, handleClick }:any) {
    return ( 
    <>
        <button 
        onClick={handleClick} 
        className="bg-pink-700 text-white text-lg mx-auto my-6 px-2 py-1 rounded-md hover:bg-pink-600">{text}</button> 
    </>
);
}

export default Button;