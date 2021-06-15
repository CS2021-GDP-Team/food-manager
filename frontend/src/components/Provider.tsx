import Main from "./Main";
import {
    MenuListContextProvider,
    RecipeListContextProvider,
    LikedRecipeContextProvider,
    DietRecordContextProvider,
    UserInfoContextProvider
} from "./Model";
/**
 * Model 데이터의 변경을 바인딩하는 파일
 */
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
