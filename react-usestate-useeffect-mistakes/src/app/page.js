"use client";

import { useState, useEffect } from "react";

/*
export default function Home() {
  const [count,setCount] = useState(0);

  const handleClick = () => {
    // // It updated count by 1 at a time
    // // setCount(count + 1); // setCount(0 + 1); => // setCount(1);
    // // setCount(count + 1); // setCount(0 + 1); => // setCount(1);
    // // setCount(count + 1); // setCount(0 + 1); => // setCount(1);

     // // Update value based on previous state value. Count is updated by 3 at a time.
    setCount(count + 1); // // <=> setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  }
  return (
    <>
   <button onClick={handleClick} type="button" style={{maxWidthwidth: "100px",maxHeight: "20px"}}> Click Me </button>
   <p>Count is : {count}</p>
   </>
  );
}
  */

//// ---------------------------------------------------------------------------------------------------
/*
//// Incorrectly sequence of state variable and render the jsx
export default function ProductCard({id}){
  
  if(!id) {
    // Sequence should be 3
    return "No id provided";
  }
  const [something, SetSomething] = useState("blabla"); // Sequence should be 1

  useEffect(() => {}, [something]); // Sequence should be 2

  // Sequence should be 4
  return <section>Product card id {id}</section>
*/

//// Correct way
/*
export default function ProductCard({id}){
const [something, SetSomething] = useState("blabla");
useEffect(() => {}, [something]);
return <section>{!id ? "No id provided" : <div>Product card id : {id}</div>}</section>
}
*/

////----------------------------------------------------------------------------------------------------

//// Incorrectly update the object and state

/*
export default function User() {
  const [user, setUser] = useState({ name: "", city: "", age: 50 });
  console.log(user);
  const handleChange = (e) => {
    //// Correct Way : Use Case 1
    // setUser({
    //   ...user, //// Copy all the object.
    //   name: e.target.value, //// only get the user name object.
    // });

    // //// Correct Way : Use Case 2
    // setUser( (prev) =>({
    //   ...prev, //// Copy all the object.
    //   name: e.target.value, //// only get the user name object.
    // }));

    //// Correct Way : Use Case 3
    // setUser((prev) => {
    //   return {
    //     ...prev, //// Copy all the object.
    //     name: e.target.value, //// only get the user name object.
    //   }
    // });
  }
  return (
    <form>
      <input type="text" onChange={handleChange} placeholder="Your name" />
    </form>
  )
}
  */

///--------------------------------------------------------------------------------------------------------
/*
export default function Form() {
  //// Case 1: Incorrect way to create the state variable for every form control 
  // // const [firstName, setFirstName] = useState("");
  // // const [lasttName, setLasttName] = useState("");

  
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
  })

  //// Case 2: Incorrect way to update the form state variable.
  // // const handleChange = e => {
  // //   setForm({
  // //     ...form,
  // //     firstName: e.target.value,
  // //     lastName: e.target.value,
  // //   });
  // // }

  /// Correct way to update the form value.
  const handleChange = e => {
    setForm({
      ...form,
     [e.target.name]: e.target.value, // All the form contral name property have the same as the form state variable.
    });
  }
   console.log(form);

  return (
    <form>
      <input type="text" name="firstName" onChange={handleChange} placeholder="Your name" />
      <br/>
      <input type="text" name="lastName" onChange={handleChange} placeholder="Your name" />
    </form>
  )
}
  */

////--------------------------------------------------------------------------------------------------------------------------------------------
/*
export default function Cart() {
  const PRICE_PER_ITEM = 5;
  const [quantity, setQuantity] = useState(1);
  ////const [totalPrice, setTotalPrice] = useState(0);
  
  //// Its work fine but not neccessary to use useEffect hook always.
  // useEffect(() => {
  //   setTotalPrice(quantity * PRICE_PER_ITEM);
  // }, [quantity])

  /// Instead we follows the below approach without using useEffect hook.
  const totalPrice = quantity * PRICE_PER_ITEM;

  
  //// Similarly suppose we have the following state variable and if we want to use derived 
  //// property like fullName from the existing state variable then we don't need to create the new state variable.
  //// We simple use the variable and concatenate them
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")

  const fullName = firstName + " " + lastName;
  

  const handleClick = e => {
    // setQuantity(quantity + 1);  //// Correct way
    setQuantity((prev)=> prev + 1); //// Correct way
  }

  return (
    <div>
      <button type="button" onClick={handleClick} >
        Add 1 Item
      </button>
      <p>Total Price: {totalPrice}</p>
    </div>
  )
}
*/

////--------------------------------------------------------------------------------------------------
/*
//// Primitive vs NonPrimitive values effect in component rerendering.
export default function Price() {

  console.log("Component Rendering...");
  const [primitve, setPrimitive] = useState(0);
  const [nonprimitve, setNonPrimitive] = useState({
    price: 100,
    totalPrice: true,
  });

  //// For primitive value like number, string and boolean, component is not re-rendering 
  //// for update the same value in state variable in event handler.
  const handleClick_PremitiveValue = e => {
    setPrimitive(0);
  }
//// For NonPprimitive value like array,object, component is re-rendering 
//// for update the same array/object in state variable in event handler.
    const handleClick_NonPrimitiveValue = e => {
      setNonPrimitive({
        price: 100,
        totalPrice: true,
      });
  }

  //// To prevent the component re-rendering (Rerender only when depedancy change)
  useEffect(() => {
  }, [nonprimitve.price,nonprimitve.totalPrice])

  return (
    <div>
      <button type="button"  onClick={handleClick_PremitiveValue} >
        Click For Primitive Value
      </button>
      <br/><br/>
      <button type="button"  onClick={handleClick_NonPrimitiveValue} >
        Click For Non-Primitive Value
      </button>
      
    </div>
  )
}
*/

////----------------------------------------------------------------------------------------------------
/*
//// Primitive vs NonPrimitive values effect in component rerendering.
export default function BlogPost() {

  //// Avodid mistake to initialize the default state variable. 
  //// For Object / Primitive value intialize the state variable as default value (blank / default value/) 
  /// or null for not exist value
  const [post, setPost] = useState({});

//// If we used typescript and for post variable we specify the default value as null
//// Please check ByteGrad typescript video. 
// //  type Post = {
// //   title: string;
// //   body: string;
// //  }
 //// const [post, setPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState(true);

  /// For typescript defined the type for the state variable as below.
  
  // // const [spinner, setSpinner] = useState<boolean>(true); //// for we dont need to specify the type, typescrit is automatically inferred the type when we actual mentioned type value.

  //// we can simply mentioned it as below
  // // const [spinner, setSpinner] = useState(true);

  // //or
  //// const [post, setPost] = useState(null);

  

  useEffect(() => {
    fetch("https://dummyjson.com/posts/1")
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
  }, [])

  return (
    <div>
      {
        loading ? "Loading....." :
          <>
            <h1>{post?.title}</h1>
            <br /><br />
            <p>{post?.body}</p>
          </>
      }
    </div>
  )
}
*/

////-----------------------------------------------------------------------------------------------------------------------
/*
//// React custom hook for code reusability, maintenance

export default function Component1() {
  
  //// Mistake => Entire code is repeated in component 1 and 2.
  //// Move the below commented code into the custom hooks and use like utility function.
  // const [windowSize, setWindowSize] = useState(1920);

  // useEffect(() => {
  //   const handleWindowSizeChange = () => {
  //     setWindowSize(window.innerWidth);
  //   };
  //   window.addEventListener('resize', handleWindowSizeChange);

  //   /// Clean up the resources i.e remove the event handle, cancelling the supsrciption etc. 
  //   return (() => {
  //     window.removeEventListener('resize', handleWindowSizeChange);
  //   })
  // },[])
  
 
   //// Use the created custom hook.
   const windowSize = useWindowSize();
  return <div>Component 1 Window Size : {windowSize}</div>
}

export function Component2() {
  
  //// Mistake => Entire code is repeated in component 1 and 2.
  //// Move the below commented code into the custom hooks and use like utility function.
  // const [windowSize, setWindowSize] = useState(1920);

  // useEffect(() => {
  //   const handleWindowSizeChange = () => {
  //     setWindowSize(window.innerWidth);
  //   };
  //   window.addEventListener('resize', handleWindowSizeChange);

  //   /// Clean up the resources i.e remove the event handle, cancelling the supsrciption etc. 
  //   return (() => {
  //     window.removeEventListener('resize', handleWindowSizeChange);
  //   })
  // },[])
  

   //// Use the created custom hook.
   const windowSize = useWindowSize();
  return <div>Component 2 Window Size : {windowSize}</div>
}


//// Custom hooks

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(1920);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowSizeChange);

    /// Clean up the resources i.e remove the event handle, cancelling the supsrciption etc. 
    return (() => {
      window.removeEventListener('resize', handleWindowSizeChange);
    })
  },[])

  return windowSize;
}
*/

////-----------------------------------------------------------------------------------------------------------------------------
/*
export default function CounterExample() {
  const [count, setCount] = useState(0);

  //// Approach 1 - Its correct way but we can optimize the code in second approach.
  useEffect(() => {
    const i = setInterval(() => {
      console.log("Interval function running.....");
      setCount(count + 1);
    }, 1000);
    ///// Clear the setInterval function in useEffect callback hook, because setInterval create the closure every time after 1 sec
    return () => { clearInterval(i); }

  }, [count]) //// Specifiy the array dependancy else only setInetrval is running with every time without incremented by 1 but it will not update in ui after the component is being rendered first time mount.


  //// Approach 2 - Without using the clearInterval 
  //// and useEffect call back function for clean up the setInterval.
  useEffect(() => {
    setInterval(() => {
      console.log("Interval function running.....");
      setCount((prevCount) => prevCount + 1);  //// setInterval Create function (in closure) only one time.
    }, 1000);
  }, [count])

  return <div>Count is : {count}</div>
}
*/

////------------------------------------------------------------------------------------------------------------------------

export default function Post() {

  const [id, setId] = useState(1);

  return (
    <div>
      <button onClick={() => setId(Math.floor(Math.random() * 100))}>Show Different Post</button>
      <br /><br />
      <PostBody id={id}/>
    </div>
  )
}

export function PostBody({id}) {
  const [text, setText] = useState('');

  useEffect(() => {
    //// To avoid ui flash during continous button click.
    const controller = new AbortController();

    fetch(`https://dummyjson.com/posts/${id}`,{
      signal:controller.signal //// Attach signal as a second parameter of fetch.
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setText(data.body);
      })

     //// Clean up the resources by useEffect call back function
     return () => controller.abort(); //// Abort the previous fetch call. i.e Fetch operation is aborted before it completes
  }, [id]) //// Specify the array dependancy to show different post on every button click.

  return <p>{text}</p>
}



