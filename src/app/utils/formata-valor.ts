export class FormataValor {

    formata(valor) {
        if (String(valor).includes('.')) {
            const divide = String(valor).split('.');
            if (divide[1].length < 2) {
                if (divide[1].length === 1) {
                    divide[1] = divide[1] + '0';
                } else {
                    divide[1] = '00';
                }
            }
            return divide[0] + ',' + divide[1];
        } else {
            return valor + ',00';
        }
    }
}
