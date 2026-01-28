import { Provider } from "react-redux";
import configStore from "./store";
import AppRoute from "./AppRoute";

const initialStore = {};
const store = configStore(initialStore);

function App() {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  );
}

export default App;
