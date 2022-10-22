import {useMemo} from "react";

const SearchBar = ({searchQuery, setSearchQuery}) => {
    return useMemo(() => {
        return (
            <form action="" method="get">
                <div className="form-control">
                    <div className="relative ml-5 mr-5 mt-5">
                        <input type="text" placeholder="Et si on se prenait quelque chose?" value={searchQuery}
                               onInput={e => setSearchQuery(e.target.value)}
                               className="w-full pr-16 input input-primary input-bordered"/>
                    </div>
                </div>
            </form>
        );
    }, [searchQuery]);

};

export default SearchBar;

