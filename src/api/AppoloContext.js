import React from 'react' 
import { ApolloClient, InMemoryCache } from '@apollo/client';

const AppoloContext = React.createContext()

const api_url = process.env.REACT_APP_API;
console.log(api_url);

export const AppoloProvider = (props) => {
  const client = new ApolloClient({
    uri: api_url,
    cache: new InMemoryCache()
  });

  return (
    <AppoloContext.Provider value={{client}}>
      {props.children}
    </AppoloContext.Provider>
  )
}

export const withClient = (Component) => (props) => {
  return (
    <AppoloContext.Consumer>
      {context => <Component context={context} {...props}/>}
    </AppoloContext.Consumer>
  )
}
