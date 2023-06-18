import { readFile, writeFile } from "fs/promises";
import { join } from "path";

interface Types {
    blue:string[] | number[],
    green: string[] | number[],
    yellow: string[] | number[],
    red: string[] | number[]
}

export class StepRecord   {
    public dbFileName: any;
    static _data: any;

    constructor(dbFileName: any) {
        this.dbFileName = join(__dirname, '../data', dbFileName);
        // this._load();

    }

    static async _load() {
        // this._data = 
        // console.log(this._data)
    }

    // static _save() {
    // }

    static async checkFinish(actualPosition:any, throwResult:any){
        if ((actualPosition+throwResult)>44) {
            const difference = actualPosition+throwResult
            throwResult = throwResult - difference
        }
        console.log('gracz dotarł do mety')
        return throwResult
    }
    
    static async getAll() {
        const data = JSON.parse(await readFile(`./data/heroes.json`, 'utf-8'))
        return data
    }

    static async update(data: any, step: any, blue: any[], green: any[], yellow: any[], red: any[]) {
        const player1 = data['player']

        if(blue[0] === player1){
            const pozycjaAktualna = blue.indexOf(step[`${player1}`])
            console.log('pozycjaAktualna', pozycjaAktualna, player1)
            const wyrzucono = data['result']
            this.checkFinish(pozycjaAktualna, wyrzucono)
            
            console.log('wyrzucono', wyrzucono)
            const wynik = pozycjaAktualna+ (wyrzucono)

            const pozycjaDocelowa = blue[wynik]
            console.log('indexnew', pozycjaDocelowa)
            const dataa = JSON.parse(await readFile(`./data/heroes.json`, 'utf-8'))
            const file ={ yellow: dataa['yellow'], green: dataa['green'], blue: pozycjaDocelowa, red: dataa['red'] }
            await writeFile(`./data/heroes.json`, JSON.stringify(file), 'utf-8');
            
        } else if (green[0] === player1){
            const pozycjaAktualna = green.indexOf(step[`${player1}`])
            console.log('pozycjaAktualna', pozycjaAktualna, player1)
            const wyrzucono = data['result']
            console.log('wyrzucono', wyrzucono)
            const wynik = pozycjaAktualna+ (wyrzucono)
            const pozycjaDocelowa = green[wynik]
            console.log('indexnew', pozycjaDocelowa)
            const dataa = JSON.parse(await readFile(`./data/heroes.json`, 'utf-8'))
            const file ={ yellow: dataa['yellow'], green: pozycjaDocelowa, blue: dataa['blue'], red: dataa['red'] }
            await writeFile(`./data/heroes.json`, JSON.stringify(file), 'utf-8');

        } else if (yellow[0] === player1){
            const pozycjaAktualna = yellow.indexOf(step[`${player1}`])
            console.log('pozycjaAktualna', pozycjaAktualna, player1)
            const wyrzucono = data['result']
            console.log('wyrzucono', wyrzucono)
            const wynik = pozycjaAktualna+ (wyrzucono)
            const pozycjaDocelowa = yellow[wynik]
            console.log('indexnew', pozycjaDocelowa)
            const dataa = JSON.parse(await readFile(`./data/heroes.json`, 'utf-8'))
            const file ={ yellow: pozycjaDocelowa, green: dataa['green'], blue: dataa['blue'], red: dataa['red'] }
            await writeFile(`./data/heroes.json`, JSON.stringify(file), 'utf-8');

        } else if (red[0] === player1){
            const pozycjaAktualna = red.indexOf(step[`${player1}`])
            console.log('pozycjaAktualna', pozycjaAktualna, player1)
            const wyrzucono = data['result']
            console.log('wyrzucono', wyrzucono)
            const wynik = pozycjaAktualna+ (wyrzucono)
            const pozycjaDocelowa = red[wynik]
            console.log('indexnew', pozycjaDocelowa)
            const dataa = JSON.parse(await readFile(`./data/heroes.json`, 'utf-8'))
            const file ={ yellow: dataa['yellow'], green: dataa['green'], blue: dataa['blue'], red: pozycjaDocelowa }
            await writeFile(`./data/heroes.json`, JSON.stringify(file), 'utf-8');

        }else {
            console.log('something went wrong')
        }
       
    }
   
    

   
}