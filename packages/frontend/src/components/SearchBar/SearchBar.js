const SearchBar = ({searchQuery, setSearchQuery}) => {
    return (
        <form action="" method="get">
            <div className="form-control">
                <div className="relative ml-5 mr-5 mt-5">
                    <input type="text" placeholder="Et si on se prenait quelques chose?" value={searchQuery}
                           onInput={e => setSearchQuery(e.target.value)}
                           className="w-full pr-16 input input-primary input-bordered"/>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;

