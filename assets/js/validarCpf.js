class ValidadorCPF{
    constructor(cpfEnviado){
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    sequencia(){
        return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
    }

    gerarCpf(){
        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const primeiroDigito = ValidadorCPF.geraDigito(cpfParcial);
        const segundoDigito = ValidadorCPF.geraDigito(cpfParcial + primeiroDigito);
        this.novoCpf = cpfParcial + primeiroDigito + segundoDigito;
    }

    static geraDigito(cpfParcial){
        let total = 0;
        let reverso = cpfParcial.length + 1;

        for(let stringNumerica of cpfParcial){
            total += reverso * Number(stringNumerica);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    validar(){
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.sequencia()) return false;
        this.gerarCpf();

        return this.novoCpf === this.cpfLimpo;
    }

    
}
