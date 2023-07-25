1.  What is the difference between Component and PureComponent? give an
    example where it might break my app.

    The difference is that PureComponent makes and equality check on the props passed to it, if they're the same it won't re-render. One way that this implementation might break is that you pass a function to a PureComponent. Since those (functions) are check by reference instead of by value, you will always re-render the PureComponent, loosing all performance improvements

2.  Context + ShouldComponentUpdate might be dangerous. Can think of why is
    that?

    This one I'm not sure, since it's been some time since I used class components. I remember reading that shouldComponentUpdate could interfere with the state propagation from Context, but I don't know the mechanics of why is that.

3.  Describe 3 ways to pass information from a component to its PARENT.

    - Using a callback

    ```jsx
    const Child = ({ updateCount }) => {
      return <button onClick={() => updateCount(10)}>Update Count to 10</button>;
    };
    const App = () => {
      const [count, setCount] = useState(0);
      return (
        <>
          <h1>Count is: {count}</h1>
    	 <Child updateCount={setCount}>
        </>
      );
    };
    ```

    - Using React Context
    - Moving state outside of components into a separate store like Redux

4.  Give 2 ways to prevent components from re-rendering.

    - Using `React.memo`
    - Using `React.PureComponent`
    - Using `React.useRef` to be able to track a value without triggering re-renders.

5.  What is a fragment and why do we need it? Give an example where it might
    break my app.

    It's a way to return one JSX element without adding an extra element to the DOM. This is needed since JSX is transpiled into JS functions, and those cannot return more than one value

    If you had something like

    ```jsx
    ...
    return (
    	<h1>Hey</h1>
    	<h2>Hola</h2>
    )
    ```

    It would roughly be transpiled into

    ```js
    ...
    return React.createElement(...) React.createElement(....)
    ```

    which is not valid JavaScript syntax, but valid HTML syntax. The way to have you JSX match your desired HTML is to use Fragments like

    ```jsx
    ...
    return (
    	<>
    	<h1>Hey</h1>
    	<h2>Hola</h2>
    	</>
    )
    ```

    It would roughly be transpiled into

    ```js
    ...
    return React.createElement(...)
    ```

    Now you are only returning one `React.createElement` but it will know that's a Fragment so it won't add any DOM element.

    As for the example where it might break an app, I can only think of someone trying to apply styles to a component that returns a fragment, thus the styles never being applied since fragments is not put in the DOM.

6.  Give 3 examples of the HOC pattern.

    I think don't fully understand the question, since the pattern it's just one implementation and giving three examples would be the same pattern three times. Apologies if I'm not understanding this correctly. My example would be using HOC to "use hooks" with class components

    ```jsx
    const withHook (ClassComponent) => {
    	return function Wrapper(props){
    		const propsFromHook = useCoolHook();
    		return <ClassComponent {...props} propsFromHook={propsFromHook} />;
    	}
    }
    ```

7.  What's the difference in handling exceptions in promises, callbacks and
    async...await.

    - Usually in callbacks you sometimes get the error as an argument to the callback itself, like in some Node.js methods `doSomething((err, result) => ...)`.
    - For promises you handle exceptions with a `catch` function
    - For async/await the common thing to do is use a `try/catch` block but since those are still promises you can also use a `catch` function

    8.  How many arguments does setState take and why is it async.

    From what I remember (again, it's been some time since I used class components) it only takes one argument, that could be either an object with the new state, or a function that receives as an argument the latest value of the state. It is async because it batches state updates to increase performance by avoiding re-renders.

8.  List the steps needed to migrate a Class to Function Component.

    - Declare component as function instead of a class
    - Use `useState` instead of `this.state`
    - Remove all instances of `this`
    - If you have lifecycle methods, replace them with `useEffect`
    - Remove the `render()` method and instead return the JSX from the function

9.  List a few ways styles can be used with components.

    - Direct styles as `<h1 style={{color: 'red'}}>Hey</h1>`
    - Class names as `<h1 className="app">Hey</h1>`
    - CSS Modules as `<h1 className={styles.app}>Hey</h1>`
    - Styled components (third-party library) as `const Button = styled.button`color: red;``
    - Tailwind utility classes

10. How to render an HTML string coming from the server.

    What I can think of is using `dangerouslySetInnerHTML` and making sure the HTML is sanitized
