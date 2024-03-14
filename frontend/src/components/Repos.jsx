import React from 'react';
import Repo from './Repo';

function repos({ repos }) {
    return (
        <div>
            <ol>
                {repos.map((repo) => (
                    <Repo key={repo.id} repo={repo} />
                ))}
                {repos.length === 0 && <p>No repos found</p>}
            </ol>
        </div>
    );
}

export default repos