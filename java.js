class Cronometro {
    private dias: number;
    private horas: number;
    private minutos: number;
    private segundos: number;
    private intervalo: NodeJS.Timeout | null;
    private elemento: HTMLElement;

    constructor(elementId: string) {
        this.dias = 0;
        this.horas = 0;
        this.minutos = 0;
        this.segundos = 0;
        this.intervalo = null;
        this.elemento = document.getElementById(elementId)!;
        this.elemento.style.backgroundColor = "#B0C4DE"; // Fundo azul-acizentado
        this.elemento.style.padding = "20px"; // Padding para dar espaço
        this.elemento.style.borderRadius = "10px"; // Bordas arredondadas
        this.elemento.style.fontFamily = "Arial, sans-serif"; // Fonte
        this.elemento.style.fontSize = "24px"; // Tamanho da fonte
        this.elemento.style.color = "#000"; // Cor do texto
    }

    iniciar() {
        if (this.intervalo) return;

        this.intervalo = setInterval(() => {
            this.segundos++;

            if (this.segundos === 60) {
                this.segundos = 0;
                this.minutos++;
            }

            if (this.minutos === 60) {
                this.minutos = 0;
                this.horas++;
            }

            if (this.horas === 24) {
                this.horas = 0;
                this.dias++;
            }

            this.exibirTempo();
        }, 1000);
    }

    pausar() {
        if (this.intervalo) {
            clearInterval(this.intervalo);
            this.intervalo = null;
        }
    }

    resetar() {
        this.pausar();
        this.dias = 0;
        this.horas = 0;
        this.minutos = 0;
        this.segundos = 0;
        this.exibirTempo();
    }

    private exibirTempo() {
        this.elemento.innerHTML = `
            <span style="color: ${this.getColor(0)}">${this.dias}d </span>
            <span style="color: ${this.getColor(1)}">${this.horas}h </span>
            <span style="color: ${this.getColor(2)}">${this.minutos}m </span>
            <span style="color: ${this.getColor(3)}">${this.segundos}s</span>
        `;
    }

    private getColor(index: number): string {
        const colors = ["#FF4500", "#FF8C00", "#FFD700", "#FF6347"]; // Degradê de cores quentes
        return colors[index % colors.length];
    }
}

const cronometro = new Cronometro("cronometroDisplay");
cronometro.iniciar();