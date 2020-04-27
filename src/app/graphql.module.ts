import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// apollo client
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from "apollo-link";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    HttpLinkModule,
    HttpClientModule,
    ApolloModule
  ]
})
export class GraphqlModule { 
  constructor(
    apollo: Apollo,
    httpLink: HttpLink 
  ) { 

    const link = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors){

        graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          "[GraphQL error]: Message:", message
          )
          );
         
        }

      if (networkError){
        
        console.log("[Network error]:", networkError);
      
      } 
    });

    apollo.create({
      link: ApolloLink.from([link, httpLink.create({ uri: "http://localhost:4000/"})]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: "cache-first",
                errorPolicy: 'all',
        },
        query: {
          fetchPolicy: "cache-first",
          errorPolicy: 'all',
      },
      mutate: {
        // fetchPolicy: 'network-only',
          errorPolicy: 'all'
      }
      }
      
    },
    "default"
    )

  }
 }
