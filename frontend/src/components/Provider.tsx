import ViewModel from "./ViewModel";
import {
    MenuListContextProvider,
    RecipeListContextProvider,
    LikedRecipeContextProvider,
    DietRecordContextProvider,
    UserInfoContextProvider
} from "./Model";
const Provider = () => (
    <DietRecordContextProvider>
        <LikedRecipeContextProvider>
            <RecipeListContextProvider>
                <MenuListContextProvider>
                    <UserInfoContextProvider>
                        <ViewModel />
                    </UserInfoContextProvider>
                </MenuListContextProvider>
            </RecipeListContextProvider>
        </LikedRecipeContextProvider>
    </DietRecordContextProvider>
);

export default Provider;
