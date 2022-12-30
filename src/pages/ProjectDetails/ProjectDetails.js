import { Box, Typography } from '@mui/material'
import React from 'react'
import images from "assets/images"
import PageTitle from 'components/PageTitle/PageTitle'
import ShadowBox from 'components/ShadowBox/ShadowBox'

const ProjectDetails = () => {
    return (
        <Box className="project-details-page" sx={{ p: 4 }}>
            <PageTitle title="PROJECT DETAILS"/>
            <Box sx={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "30px",minHeight:"60vh" }}>
                <ShadowBox className="details-left" sx={{ boxShadow: 2, borderRadius: "10px" }}>
                    <Box className="details-left-content"
                    sx={{px:2,py:3,display:"flex",flexDirection:"column",alignItems:"center"}}
                    >
                        <Box component="img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAk1BMVEX///8mKTNrbXIAAAAaHSn6+voVGSf7sDvn5+hgYmgXGyc3OkJJTFMcICsTGCUNEiIFDR0AABUAABghJS+xsrWMjZG4uLuEhYru7u4xND3W1tjh4eLLy837rS1BQ0tmZ23/8tv9uEn/8+X9vVz/+/T9z5D9yn1SVFsAAAihoqX93rT/48D9zIb8w2/+6MuYmZ14eX1JpocrAAADY0lEQVRoge2X23abOBRALUAOCI4kEHdk3JlkBjzTFv7/6yowpiEBE3cyqy9nP2QRCbSlo6OLDwcEQRAEQRAEQRAEQRAEQRDkYSj9DdI8zc5Fcc7S/L+00nXxYx+U5yhioBSwKLKqe2/GdXenNgzPD3ktG8gM2NZ2yMsQ2nS7IeZYD2jdghufYjIMJVPmSeYvm2IJ4R3x8RFxVcAgq7NY6zirJbDqyx9/br0dN8mdth4R54FDCPfjKbw09tOX0+l5c8x3eUScSULE+VUu54fn09Ppr/9bXJr5Zd4im16M+On05WeBe+n7viuv72ttwqJ1Zf4k42yXXW/1l2opNquztzJ9Z2OwGCHR2/pB/PftnzwT0gEQUTM03thAD65tZ3kTtmZlVZ4UDjhS9Pkr8YVEzHFY6Ostb2WyWLxb9P8Y89OUX24hVGTbduuAbQbtOb4RC5Z5gtvdQXMHQlMbAi/yWexF5pPj0Raq3dpQ4ogo8r7YeE//jk/UB1YMISutiNjuwWOjmCihOp1XUklvGJUOBBA6iXsJxTgLF6nCjTFnnLDsffHXOb0S6dwy4GKLdBY7zRDaAMS0umjfFtVVXLaqnpK1VBCsz7MHK5EeY336Njy4BfhzxifmaR7xMOHa9OpWmV/oFOreicpbaSej1SHTQhG+UvPdTPLz8KAjcVn29CqGcU9OuFx+PIgpgbk3h5zwlYB+QNwJUS5qJvG1Oc8plofZIK6OqklmCmjWxLuhTgQsD6uFOHDq5QwO4lISkDMw5NwKe8l1f8SN46+MWCg/+Em9flDuLac0ksuALMQZk8tuDeIc4AP75t4GUinw51Cl9I3YZPXsoOkkPljQuvvmvS0zE+zWdmpDuhQfapC3C0li++VVrFtobjOQ9Vt92DskXB94UOaUVgknrX4j1kfF+5JSWlocju60c1nSCfSgrnoebWwg+8diWXAQdRMoDmE879W31RkLYKxu6iNjRM9Xn0aaT86WpzgvlknwirWLwNPri0B1lpwxxqN6WPBNS8bTqZ9qdRANtUJ6xkDbdtw7aKIkN5jSOzfH/auPTrzG69Oxa2lskiiP43nXoWlmapPr0TuXVxermUu3eOSy98l8/Hr72Xz8Qv/pfM5PmF/kt/xoQxAEQRAEQRAEQRAEQRAEQSZ+APm5R01EuS4sAAAAAElFTkSuQmCC"
                            sx={{ width: 100, height: 100, border: '1px solid #ccc', borderRadius: "50%" }}
                        />

                        <Typography variant="h6" fontWeight="bold" my={1}
                        fontSize="19px"
                        >000000-000000</Typography>
                        <Typography variant="body2" >PROJECT NAME</Typography>
                        <Typography variant="body2"  >PROJECT NAME</Typography>
                    </Box>
                </ShadowBox>
                <ShadowBox className="details-left" sx={{ boxShadow: 2, borderRadius: "10px" }}>
                    
                </ShadowBox>
                {/* <ShadowBox >k</ShadowBox> */}

            </Box>
        </Box>
    )
}

export default ProjectDetails