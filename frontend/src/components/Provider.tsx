import ViewModel from "./ViewModel";
import { MenuListContextProvider, RecipeListContextProvider } from "./Model";
const Provider = () => (
    <RecipeListContextProvider>
        <MenuListContextProvider>
            <ViewModel />
        </MenuListContextProvider>
    </RecipeListContextProvider>
);

export default Provider;
