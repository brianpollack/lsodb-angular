import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// apollo client
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


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
    apollo.create({
      link: httpLink.create({ uri: "http://localhost:4000/"}),
      cache: new InMemoryCache()
    })

  }
 }