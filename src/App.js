import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Modal.css";

// Função para aplicar máscara manualmente
const formatTelefone = (value) => {
  const cleaned = value.replace(/\D/g, "").slice(0, 11);
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return value;
};

function CadastroUsuario() {
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      confirmarSenha: "",
    },
    validationSchema: Yup.object({
      nome: Yup.string()
        .min(3, "Nome deve ter pelo menos 3 caracteres")
        .required("Nome é obrigatório"),
      email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail é obrigatório"),
      telefone: Yup.string()
        .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato de telefone inválido")
        .required("Telefone é obrigatório"),
      senha: Yup.string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .matches(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
        .matches(/[a-z]/, "Deve conter ao menos uma letra minúscula")
        .matches(/[0-9]/, "Deve conter ao menos um número")
        .required("Senha é obrigatória"),
      confirmarSenha: Yup.string()
        .oneOf([Yup.ref("senha")], "As senhas não coincidem")
        .required("Confirmação de senha é obrigatória"),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      setShowModal(true);
    },
  });

  // Manipulador customizado para aplicar máscara
  const handleTelefoneChange = (e) => {
    const masked = formatTelefone(e.target.value);
    formik.setFieldValue("telefone", masked);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h3>Cadastro de Usuário</h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.nome && formik.errors.nome}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.nome}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="tel"
            name="telefone"
            value={formik.values.telefone}
            onChange={handleTelefoneChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.telefone && formik.errors.telefone}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.telefone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="senha"
            value={formik.values.senha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.senha && formik.errors.senha}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.senha}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirmar Senha</Form.Label>
          <Form.Control
            type="password"
            name="confirmarSenha"
            value={formik.values.confirmarSenha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.confirmarSenha && formik.errors.confirmarSenha
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.confirmarSenha}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" style={{ marginTop: "15px" }}>
          Cadastrar
        </Button>
      </Form>

      {showModal && (
        <div className="modal-overlay modal-content">
          <div className="modal-content">
            <h2>Cadastro realizado com sucesso!</h2>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroUsuario;
