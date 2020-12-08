import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  public databaseState: BehaviorSubject<Boolean>;
  public databaseFilled: Boolean = false;
  public database: SQLiteObject;



  constructor(
    public sqlite: SQLite,
    private http: HttpClient,
    public storage: Storage,
    public sqlitePorter: SQLitePorter
  ) { 
    this.databaseState = new BehaviorSubject<boolean>(false);
  }

  public async initDatabase() {
    await this.createDatabase().then(async() => {
        await this.executeCreateTables().then(async () => {
          await this.insertDummyData().then(async () => {
            this.setDatabaseState(true);
          }).catch((e) => {
            console.log(e);
          });
        }).catch((e) => {
          console.log(e);
        })
    }).catch((e) => {
      console.log(e);
    });
}

  public async createDatabase(): Promise<any> {
    // initial create block is used to create database and create+insert data into exercises table
   return await this.sqlite.create({name: "data.db", location: "default"}).then(async (db : SQLiteObject) => {
    this.database = db;
    await this.storage.get('database_filled').then(async (val) => {
      this.databaseFilled = val;
      console.log(navigator.userAgent);
      if (navigator.userAgent == 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36') {
        this.databaseFilled = false;
      }
      if (!val) {
        await this.fillDatabase(val);
      }
    });
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

  public getDatabaseState(): Observable<Boolean> {
    return this.databaseState.asObservable();
  }

  public setDatabaseState(boolean: Boolean): void {
    this.databaseState.next(boolean);
  }

  public async fillDatabase(val: boolean) {
    await this.http.get('assets/sql/exerciseTable.sql', {responseType: 'text'}).toPromise().then(async (res: string) => {
      const sqlArray = res.split(';');
      console.log(`%c Creating Exercises`, 'color: blue; font-weight: bold');
       if (!val) {
        await Promise.all(sqlArray.map(async (sql) => {
          await this.database.executeSql(sql, [])
          .catch((e) => console.log(e)); 
          }))
        .then(() => {
          this.storage.set('database_filled', true); 
        });
       } else {
        await this.database.executeSql(sqlArray[0], []).then((res) => {
          console.log(res);
        }).catch((e) => {
          console.log(e);
        });
       }
    });
  }

  public async executeCreateTables(): Promise<any> {
    // return await Promise.all(this.sourceTables.map(async (source) => {     
    //   console.log(`%c Creating ${source}`, 'color: purple; font-weight: bold'); 
    //   return await this.createTable(source).then(() => {
    //     return true;
    //   });
    // }));
  }

  public async createTable(source: string): Promise<any> {
    return await this.http.get(source, {responseType: 'text'})
            .toPromise().then(async (sql: string) => {
              console.log(`%c ${source} retrieved, preparing SQL statement`, 'color: purple; font-weight: bold');
              return await this.database.executeSql(sql, [])
              .then(async (res) => {
                  console.log(`%c ${source} SQL Statement executed!`, 'color: blue; font-weight: bold');  
                  return res;
              })
              .catch((e) => console.log(e));    
        });
  }

  public async insertDummyData(): Promise<any> {
    // return await Promise.all(this.sourceData.map(async (source) => {
    //   console.log(this.databaseFilled);
    //   if (!this.databaseFilled) {
    //     console.log(`%c Inserting ${source}`, 'color: purple; font-weight: bold'); 
    //     return await this.createTable(source).then(async () => {
    //       return true;
    //     });
    //   }
    // }));
  }

  public selectFromTable(sVal: string, table: string): Promise<any> {
    return this.database.executeSql(`select ${sVal} from ${table}`, [])
    .then((res)=> {
      const row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          row_data.push(res.rows.item(i));
        }
      }
    }).catch((e) => {
      console.log(e);
    });
  }
}