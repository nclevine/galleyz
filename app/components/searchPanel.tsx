'use client'

import { useState, useEffect } from 'react';

export default function SearchPanel() {
	const [query, setQuery] = useState('');

	return (
		<div>
			<input
				type='text'
				value={query}
		        onChange={(e) => setQuery(e.target.value)}
				placeholder='Search...'
			/>
		</div>
	)
}
