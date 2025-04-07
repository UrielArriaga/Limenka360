import React from "react";
import MainLayout from "./components/Layout/MainLayout";
import TemplateForm from "./components/Forms/TemplateForm";
class App extends React.Component {
  render() {
    return (
      <MainLayout>
        <TemplateForm />
      </MainLayout>
    );
  }
}

export default App;