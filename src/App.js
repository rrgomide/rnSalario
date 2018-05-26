import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';

import { Salario } from './Salario';

/**
 * Estilo para aumentar um pouco a fonte
 */
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25
  }
});

/**
 * Componente para customizar
 * texto
 * @param {*} props
 */
const MyText = props => {
  return <Text style={styles.textStyle}>{props.children}</Text>;
};

/**
 * Componente para customizar TextInput
 * @param {*} props
 */
const MyTextInput = props => {
  /**
   * Desestruturando valores
   */
  const { value, onChangeText, editable = true } = props;

  return (
    <TextInput
      style={styles.textStyle}
      onChangeText={onChangeText}
      editable={editable}
      value={value}
      keyboardType="numeric"
    />
  );
};

/**
 * Componente para unir label + input
 * @param {*} props
 */
const MyLabeledTextInput = props => {
  const { label, value, onChangeText, editable = true } = props;
  return (
    <View>
      <MyText>{props.label}</MyText>
      <MyTextInput
        value={props.value}
        onChangeText={props.onChangeText}
        editable={props.editable}
      />
    </View>
  );
};

/**
 * Classe principal, que deve
 * extender de Component (React)
 */
export default class App extends Component {
  /**
   * Construtor
   */
  constructor() {
    super();

    /**
     * Estado do app (objeto Salario iniciado com 0)
     */
    this.state = {
      salario: new Salario(0)
    };
  }

  /**
   * Atualizando o estado através
   * da criação de um novo objeto
   * (imutabilidade)
   *
   * Obs: +novoSalario converte novoSalario, que é string,
   * para number
   */
  atualizarSalario = novoSalario => {
    this.setState({
      salario: new Salario(+novoSalario)
    });
  };

  render() {
    /**
     * Desestruturando valores
     */
    const {
      baseINSS,
      baseIRPF,
      descontoINSS,
      descontoIRPF,
      salarioBruto,
      salarioLiquido
    } = this.state.salario;

    return (
      <View style={{ padding: 5 }}>
        {/* O primeiro componente é editável e não
             está vinculado ao estado do app. Sua
             função é alterar o estado do app com
             'onChangeText' */}
        <MyLabeledTextInput
          label="Salário bruto:"
          onChangeText={novoSalario => this.atualizarSalario(novoSalario)}
        />

        {/* Os demais componentes são "somente leitura" e estão
            vinculados às diversas propriedades fornecidas pela
            classe Salario */}
        <MyLabeledTextInput
          label="Base INSS:"
          editable={false}
          value={baseINSS}
        />

        <MyLabeledTextInput
          label="Desconto INSS:"
          editable={false}
          value={descontoINSS}
        />

        <MyLabeledTextInput
          label="Base IRPF:"
          editable={false}
          value={baseIRPF}
        />

        <MyLabeledTextInput
          label="Desconto IRPF:"
          editable={false}
          value={descontoIRPF}
        />

        <MyLabeledTextInput
          label="Salário líquido:"
          editable={false}
          value={salarioLiquido}
        />
      </View>
    );
  }
}
