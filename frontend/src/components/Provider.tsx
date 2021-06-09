import Main from "./Main";
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
                        <Main />
                    </UserInfoContextProvider>
                </MenuListContextProvider>
            </RecipeListContextProvider>
        </LikedRecipeContextProvider>
    </DietRecordContextProvider>
);

export default Provider;
