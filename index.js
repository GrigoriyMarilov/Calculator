const Calc_Buttons = document.querySelectorAll('.button')
const Line = document.querySelector(".line")
const SubLine = document.querySelector(".sub_line")
class CALCULATOR {
    constructor(line, subline, Calc_Buttons){
        this.left = "";
        this.operator = "";
        this.right = "";
        this.Calc_Buttons = Calc_Buttons;
        this.Line = line;
        this.SubLine = subline;
    }
    isNumeric(value) {
        return /^-?\d+$/.test(value);
    }
    isMath(value){
        if(value === "+" || value==="*" || value==="-" || value==="÷") return true
        return false
    }
    addTextToLine(text){
        return this.Line.innerText+= text
    }
    clearLine(){
        return this.Line.innerText = " "
    }
    clearSubLine(){
        return this.SubLine.innerText = " "
    }
    deleteLastChar(){
        this.Line.innerText = this.Line.innerText.slice(0, -1)
    }
    addTextToSubLine(){
        return this.SubLine.textContent = this.Line.innerText
    }
    caclResult(){
        
        let arr =  this.Line.innerText.split(this.operator)
        this.right =arr[arr.length-1]
        let res = 0;
        this.addTextToSubLine()
        this.clearLine()
        switch (this.operator) {
            case "+":
                 res = parseFloat(this.left) + parseFloat(this.right)
                break;
            case "-":
                 res = parseFloat(this.left) - parseFloat(this.right)
                break;
            case "÷":
                 res = parseFloat(this.left) / parseFloat(this.right)
                break;
            case "*":
                 res = parseFloat(this.left) * parseFloat(this.right)
                break;
        }
        this.addTextToLine(res)
    }
    start(){
        this.Calc_Buttons.forEach((el,index)=>{
            let value = el.innerText
            //Цифры
            if(this.isNumeric(value)) el.addEventListener("click" , (e)=>this.addTextToLine(value))
            //Операторы
            else if(this.isMath(value)) el.addEventListener("click", (e)=>{
                
                if(this.operator){
                    this.caclResult()
                }
                this.addTextToLine(value)
                this.left = this.Line.innerText
                this.operator=value
            })
            //Backspace
            else if(value==="DEL") el.addEventListener("click", e=>{
                this.deleteLastChar()
            })
        
            //calculate
            else if(value==="=") el.addEventListener("click", e=>{
                this.caclResult()
            })
            //dot
            else if(value===".") el.addEventListener("click", e=>{
                this.addTextToLine(value)
            })
            //AC
            else if(value==="AC") el.addEventListener("click", e=>{
                this.clearLine()
                this.clearSubLine()
                this.clear()
            })
        })
    }
    //отчистка
    clear(){
        this.left = ""
        this.operator = ""
        this.right = ""
    }
}
const operator_memory = new CALCULATOR(Line, SubLine, Calc_Buttons)
operator_memory.start()


