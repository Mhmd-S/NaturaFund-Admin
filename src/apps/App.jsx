import AppRouter from '@routes/AppRouter';
import Nav from '@modules/Nav';
import Header from '@modules/HeaderModule';

const App = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-[20%_80%] grid-flow-row divide-x divide-y">
      <Header />
      <Nav />

      <AppRouter />
    </div>
  );
};

export default App;
