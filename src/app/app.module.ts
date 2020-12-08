import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './post-list/post-list.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ViewPostComponent } from './view-post/view-post.component';

//sqlite
import { SQLite, SQLiteDatabaseConfig} from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import { DatabaseService}  from './services/database.service';


declare var SQL;

export class SQLiteMock {
  public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
    //since this is an in memory database we can ignore the config parameters 
    var db = new SQL.Database();

    return new Promise((resolve,reject)=>{
      resolve(new SQLiteObject(db));
    });
  }
} 

export class SQLiteObject{
  _objectInstance: any;

  constructor(_objectInstance: any){
      this._objectInstance = _objectInstance;
  };

  executeSql(statement: string, params: any): Promise<any>{

    return new Promise((resolve,reject)=>{
      try {
        var st = this._objectInstance.prepare(statement,params);
        // console.log(st);
        var rows :Array<any> = [] ;
        while(st.step()) { 
            var row = st.getAsObject();
            rows.push(row);
        }
        var payload = {
          rows: {
            item: function(i) {
              return rows[i];
            },
            length: rows.length
          },
          // Disable the below code due to getRowsModified being undefined
          // rowsAffected: this._objectInstance.getRowsModified() || 0,
          insertId: this._objectInstance.insertId || void 0
        };  
  
        //save database after each sql query 
  
        var arr : ArrayBuffer = this._objectInstance.export();
        localStorage.setItem("database",String(arr));
        resolve(payload);
      } catch(e){
        reject(e);
      }
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    UserLoginComponent,
    UserDetailsComponent,
    HeaderComponent,
    PostListComponent,
    CreatePostComponent,
    ViewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
        // SQLite,
        {provide: SQLite, useClass: SQLiteMock},
        DatabaseService,
        SQLitePorter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
