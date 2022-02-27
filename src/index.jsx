import ReactDOM from 'react-dom';
import Provider from './ApolloProvider';
import { AuthProvider } from './context/auth';

ReactDOM.render(
  <AuthProvider>{Provider}</AuthProvider>,
  document.getElementById('root')
);
