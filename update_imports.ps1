
$files = Get-ChildItem -Path "src\app" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName
    $newContent = $content -replace '"@/components/sections/TourLayout"', '"@/features/tours/components/TourLayout"' `
                           -replace '"@/components/sections/ExcursionLayout"', '"@/features/excursions/components/ExcursionLayout"' `
                           -replace '"@/components/sections/ToursView"', '"@/features/tours/components/ToursView"' `
                           -replace '"@/_components/sections/ExcursionsView"', '"@/features/excursions/components/ExcursionsView"' `
                           -replace '"@/components/sections/ExcursionsView"', '"@/features/excursions/components/ExcursionsView"' `
                           -replace '"@/components/sections/HomeView"', '"@/features/home/components/HomeView"' `
                           -replace '"@/components/sections/AboutView"', '"@/features/about/components/AboutView"' `
                           -replace '"@/components/sections/ContactView"', '"@/features/contact/components/ContactView"'
    
    if ($content -ne $newContent) {
        $newContent | Set-Content $file.FullName
        Write-Host "Updated $($file.FullName)"
    }
}
