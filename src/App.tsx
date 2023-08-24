import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import { combinedReducer } from "./reducers/combineReducer";
import { Sceen } from "./components/Sceen";

const store = configureStore({reducer:combinedReducer});

function App() {
  return (
    <Provider store={store}>
      <Sceen/>
    </Provider>
  )
}

export default App
