import ViewModel from "./ViewModel";
import {
    MenuListContextProvider,
    RecipeListContextProvider,
    LikedRecipeContextProvider
} from "./Model";
const Provider = () => (
    <LikedRecipeContextProvider>
        <RecipeListContextProvider>
            <MenuListContextProvider>
                <ViewModel />
            </MenuListContextProvider>
        </RecipeListContextProvider>
    </LikedRecipeContextProvider>
);

export default Provider;
