type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    'Detail':{id: string, title: string, price: number, image: any, description: string}| undefined;
    //Feed: { sort: 'latest' | 'top' } | undefined;
  };
  
  declare global {
    namespace ReactNavigation{
        interface RootStackParamList extends RootStackParamList { }
    }
  }