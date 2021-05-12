import ViewModel from "./ViewModel";
import {
    MenuListContextProvider,
    RecipeListContextProvider,
    LikedRecipeContextProvider,
    DietRecordContextProvider
} from "./Model";
const Provider = () => (
    <DietRecordContextProvider>
        <LikedRecipeContextProvider>
            <RecipeListContextProvider>
                <MenuListContextProvider>
                    <ViewModel />
                </MenuListContextProvider>
            </RecipeListContextProvider>
        </LikedRecipeContextProvider>
    </DietRecordContextProvider>
);

export default Provider;
