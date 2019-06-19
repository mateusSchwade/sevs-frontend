import * as moment from 'moment/moment';
import { FormataCpf } from './formata-cpf';
import { FormataValor } from './formata-valor';


export class Relatorios {

    private formataCpf = new FormataCpf();
    private formataValor = new FormataValor();

    usuarios(usuarios) {
        const listaGerada = [
            [
                {
                    fillColor: '#ffffff',
                    border: [false, false, false, false],
                    colSpan: 4,
                    margin: [0, 5, 0, 0],
                    style: 'header',
                    alignment: 'center',
                    text: 'Usuários'
                }, '', '', ''
            ],
            [
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Nome '
                },
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'E-mail'
                },
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Cpf'
                },
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Tipo'
                }
            ]
        ];
        usuarios.forEach(usuario => {
            listaGerada.push(
                [
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: usuario.usunom
                    },
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: usuario.usuema
                    },
                    {
                        border: [false, false, false, false],
                        style: 'content', text: this.formataCpf.formataCpf(usuario.usucpf)
                    },
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: (usuario.usutip === 'A' ? 'Administrador' : 'Cliente')
                    }
                ]
            );
        });
        const lista: any = [
            {
                table: {
                    headerRows: 3,
                    widths: [120, '*', '*', '*'],
                    body: listaGerada

                },
                layout: {
                    fillColor: function (i, node) {
                        return (i % 2 === 0) ? '#eeeeee' : null;
                    }
                }
            },
            '\n\n',
            {
                style: 'header2',
                text: 'Total de Usuarios: ' + usuarios.length
            }
        ];
        return lista;
    }

    produtos(produtos) {
        const listaGerada = [
            [
                {
                    fillColor: '#ffffff',
                    border: [false, false, false, false],
                    colSpan: 3,
                    margin: [0, 5, 0, 0],
                    style: 'header',
                    alignment: 'center',
                    text: 'Produtos'
                }, '', ''
            ],
            [
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Nome '
                },
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Tipo'
                },
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Valor'
                }
            ]
        ];
        produtos.forEach(produto => {
            listaGerada.push(
                [
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: produto.pronom
                    },
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: (produto.protip === 'C' ? 'Chá' : 'Shake')
                    },
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: 'R$ ' + this.formataValor.formata(produto.propre)
                    }
                ]
            );
        });
        const lista: any = [
            {
                table: {
                    headerRows: 3,
                    widths: [120, '*', '*'],
                    body: listaGerada

                },
                layout: {
                    fillColor: function (i, node) {
                        return (i % 2 === 0) ? '#eeeeee' : null;
                    }
                }
            },
            '\n\n',
            {
                style: 'header2',
                text: 'Total de Produtos: ' + produtos.length
            }
        ];
        return lista;
    }

    pedidos(pedidos) {
        const listaGerada = [
            [
                {
                    fillColor: '#ffffff',
                    border: [false, false, false, false],
                    colSpan: 7,
                    margin: [0, 5, 0, 0],
                    style: 'header',
                    alignment: 'center',
                    text: 'Pedidos'
                }, '', '', '', '', '', ''
            ],
            [
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Status'
                },
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'TipoCliente'
                },
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Primeiro Chá'
                },
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Segundo Chá'
                },
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Shake'
                },
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Valor'
                },
                {
                    border: [false, false, false, true],
                    style: 'th',
                    text: 'Data Pedido'
                }
            ]
        ];
        pedidos.forEach(pedido => {
            let sta = '';
            if (pedido.status === 1) {
                sta = 'Aguardando';
            }
            if (pedido.status === 2) {
                sta = 'Preparando';
            }
            if (pedido.status === 3) {
                sta = 'Pronto';
            }
            if (pedido.status === 4) {
                sta = 'Recusado';
            }
            listaGerada.push(
                [
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: sta
                    },
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: pedido.usuario.usunom || ''
                    },
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: pedido.pcha.pronom || ''
                    },
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: pedido.scha.pronom || ''
                    },
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: pedido.pshake.pronom + ',' + pedido.sshake.pronom || ''
                    },
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: 'R$ ' + this.formataValor.formata(pedido.preco) || ''
                    },
                    {
                        border: [false, false, false, false],
                        style: 'content',
                        text: moment(pedido.data).format('DD/MM/YYYY hh:mm:ss') || ''
                    }
                ]
            );
        });
        const lista: any = [
            {
                table: {
                    headerRows: 3,
                    widths: [60, '*', '*', '*', '*', '*', '*'],
                    body: listaGerada

                },
                layout: {
                    fillColor: function (i, node) {
                        return (i % 2 === 0) ? '#eeeeee' : null;
                    }
                }
            },
            '\n\n',
            {
                style: 'header2',
                text: 'Total de Pedidos: ' + pedidos.length
            }
        ];
        return lista;
    }

}
